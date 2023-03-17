using Microsoft.EntityFrameworkCore;
using System.Threading;
using TatBlog.Core.Contracts;
using TatBlog.Core.DTO;
using TatBlog.Core.Entities;
using TatBlog.Data.Contexts;
using TatBlog.Services.Extensions;

namespace TatBlog.Services.Blogs {
    public class AuthorRepository : IAuthorRepository{

        private readonly BlogDbContext _context;

        public AuthorRepository(BlogDbContext context) {
            _context = context;
        }

        public async Task<Author> AddOrUpdateAuthor(Author author, CancellationToken cancellationToken = default) {
            if (_context.Set<Author>().Any(a => a.Id == author.Id)){
                _context.Entry(author).State = EntityState.Modified;
            }
            else {
                _context.Set<Author>().Add(author);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return author;
        }

        public async Task<Author> GetAuthorById(int id, CancellationToken cancellationToken = default) {
            return await _context.Set<Author>()
                .FirstOrDefaultAsync(a => a.Id == id,cancellationToken);
        }

        public async Task<Author> GetAuthorBySlug(string slug, CancellationToken cancellationToken = default) {
            return await _context.Set<Author>()
                .FirstOrDefaultAsync(a => a.UrlSlug == slug, cancellationToken);
        }

        public async Task<IList<Author>> GetAuthorsWithMostPost(int authorsQuantities, CancellationToken cancellationToken = default) {
            var authors = _context.Set<Author>()
                .Select(a => new AuthorItem() {
                    PostCount = a.Posts.Count(p => p.Published)
                })
                .ToList();

            var maxPostCount = authors.Max(a => a.PostCount);

            return await _context.Set<Author>()
                .Where(a => a.Posts.Count(p => p.Published) == maxPostCount)
                .Take(authorsQuantities)
                .ToListAsync(cancellationToken);
        }

        private IQueryable<AuthorItem> AuthorFilter(IAuthorQuery authorQuery) {
            var authors = _context.Set<Author>()
                .WhereIf(!string.IsNullOrWhiteSpace(authorQuery.Keyword), s =>
                    s.Email.Contains(authorQuery.Keyword) ||
                    s.FullName.Contains(authorQuery.Keyword) ||
                    s.Notes.Contains(authorQuery.Keyword))
                .WhereIf(authorQuery.Month != 0, s => s.JoinedDate.Month == authorQuery.Month)
                .WhereIf(authorQuery.Year != 0, s => s.JoinedDate.Year == authorQuery.Year)
                .Select(s => new AuthorItem() {
                    Id = s.Id,
                    Email = s.Email,
                    FullName = s.FullName,
                    ImageUrl = s.ImageUrl,
                    JoinedDate = s.JoinedDate,
                    Notes = s.Notes,
                    PostCount = s.Posts.Count(p => p.Published)
                });
            return authors;
        }

        public async Task<IPagedList<AuthorItem>> GetPagedAuthorPosts(IAuthorQuery authorQuery, IPagingParams pagingParams, CancellationToken cancellationToken = default) {
            return await AuthorFilter(authorQuery).ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> IsExistAuthorSlugAsync(int id, string slug, CancellationToken cancellationToken = default) {
            return await _context.Set<Author>().AnyAsync(a => a.Id != id && a.UrlSlug.Equals(slug), cancellationToken);
        }

        public async Task<bool> DeleteAuthorAsync(int id, CancellationToken cancellationToken = default) {
            return await _context.Set<Author>().Where(x => x.Id == id).ExecuteDeleteAsync(cancellationToken) > 0;
        }
    }
}
