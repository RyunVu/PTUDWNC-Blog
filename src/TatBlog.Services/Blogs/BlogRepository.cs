﻿using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Linq;
using System.Linq.Dynamic.Core;
using TatBlog.Core.Contracts;
using TatBlog.Core.DTO;
using TatBlog.Core.Entities;
using TatBlog.Data.Contexts;
using TatBlog.Services.Extensions;

namespace TatBlog.Services.Blogs {
    public class BlogRepository : IBlogRepository {

        private readonly BlogDbContext _context;

        public async Task<IList<Post>> GetAllPostsAsync(CancellationToken cancellationToken) {
            return await _context.Set<Post>()
                .Include(c => c.Category)
                .Include(a => a.Author)
                .Include(t => t.Tags)
                .OrderBy(n => n.Title)
                .ToListAsync(cancellationToken);
        }

        public async Task<IList<Author>> GetAllAuthorsAsync(CancellationToken cancellationToken = default) {
            return await _context.Set<Author>()
                .ToListAsync(cancellationToken);
        }

        public BlogRepository(BlogDbContext context) {
            _context = context;
        }

        public async Task<Post> GetPostAsync(int year, int month, string slug, CancellationToken cancellationToken = default) {
            IQueryable<Post> postsQuery = _context.Set<Post>()
               .Include(x => x.Category)
               .Include(x => x.Author);

            if (year > 0) {
                postsQuery = postsQuery.Where(x => x.PostedDate.Year == year);
            }

            if (month > 0) {
                postsQuery = postsQuery.Where(x => x.PostedDate.Month == month);
            }

            if (!string.IsNullOrWhiteSpace(slug)) {
                postsQuery = postsQuery.Where(x => x.UrlSlug == slug);
            }

            return await postsQuery.FirstOrDefaultAsync(cancellationToken);
        }
        public async Task<IList<Post>> GetPopularAriticlesAsync(int numPosts, CancellationToken cancellationToken = default) {
            return await _context.Set<Post>()
                .Include(x => x.Author)
                .Include(x => x.Category)
                .OrderByDescending(p => p.ViewCount)
                .Take(numPosts)
                .ToListAsync(cancellationToken);
        }
        public async Task<bool> IsPostSlugExistedAsync(int postId, string slug, CancellationToken cancellationToken = default) {
            return await _context.Set<Post>()
                .AnyAsync(x => x.Id != postId && x.UrlSlug == slug, cancellationToken);
        }

        public async Task IncreaseViewCountAsync(int postId, CancellationToken cancellationToken = default) {
            await _context.Set<Post>()
                .Where(x => x.Id == postId)
                .ExecuteUpdateAsync(p =>
                    p.SetProperty(x => x.ViewCount, x => x.ViewCount + 1), cancellationToken);
        }

        public async Task<IList<CategoryItem>> GetCategoriesAsync(bool showOnMenu = false, CancellationToken cancellationToken = default) {
            IQueryable<Category> categories = _context.Set<Category>();

            if (showOnMenu) {
                categories = categories.Where(x => x.ShowOnMenu);
            }
            return await categories
                .OrderBy(x => x.Name)
                .Select(x => new CategoryItem() {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug= x.UrlSlug,
                    Description = x.Description,
                    ShowOnMenu = x.ShowOnMenu,
                    PostCount = x.Posts.Count(p => p.Published)
                })
                .ToListAsync();
        }

        public async Task<IPagedList<TagItem>> GetPagedTagsAsync(IPagingParams pagingParams, CancellationToken cancellationToken = default) {
            var tagQuery = _context.Set<Tag>()
                .Select(x => new TagItem() {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug = x.UrlSlug,
                    Description = x.Description,
                    PostCount = x.Posts.Count(p => p.Published)
                });

            return await tagQuery
                .ToPagedListAsync(pagingParams, cancellationToken);
        }

        // Part C
        public async Task<Tag> GetTagFromSlugAsync(string slug, CancellationToken cancellationToken = default) {
            IQueryable<Tag> tagQuery = _context.Set<Tag>();
            if (!string.IsNullOrWhiteSpace(slug)) {
                tagQuery = tagQuery.Where(x => x.UrlSlug.Equals(slug));
            }
            return await tagQuery.FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IList<TagItem>> GetTagsAsync(CancellationToken cancellationToken = default) {
            return await _context.Set<Tag>()
                .OrderBy(x => x.Name)
                .Select(x => new TagItem() {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug = x.UrlSlug,
                    Description = x.Description,
                    PostCount = x.Posts.Count(p => p.Published),
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<bool> DeleteTagByIdAsync(int id, CancellationToken cancellationToken = default) {
            return await _context.Set<Tag>()
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync(cancellationToken) > 0;
        }

        public async Task<Category> GetCategoryBySlugAsync(string slug, CancellationToken cancellationToken = default) {
            return await _context.Set<Category>()
                .Where(c => c.UrlSlug.Equals(slug))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Category> GetCategoryByIdAsync(int id, CancellationToken cancellationToken = default) {

            return await _context.Set<Category>()
                .Where(c => c.Id.Equals(id))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Category> AddOrUpdateCategoryAsync(Category category, CancellationToken cancellationToken = default) {

            if (_context.Set<Category>().Any(c => c.Id == category.Id)) {
                _context.Entry(category).State = EntityState.Modified;
            }
            else{
                _context.Categories.Add(category);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return category;

        }

        public async Task<bool> DeleteCategoryByIdAsync(int id, CancellationToken cancellationToken = default) {
            return await _context.Set<Category>()
                .Where(c => c.Id == id)
                .ExecuteDeleteAsync(cancellationToken) > 0;
        }

        public async Task<bool> IsCategorySlugExistedAsync(string slug, CancellationToken cancellationToken = default) {
            return await _context.Set<Category>()
                .Where(c => c.UrlSlug.Equals(slug))
                .AnyAsync();
        }

        public async Task<IPagedList<CategoryItem>> GetPagedCategoryAsync(IPagingParams pagingParams, CancellationToken cancellationToken = default) {
            var tagQuery = _context.Set<Category>()
                .Select(x => new CategoryItem {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug= x.UrlSlug,
                    Description = x.Description,
                    ShowOnMenu = x.ShowOnMenu,
                    PostCount = x.Posts.Count(p => p.Published)
                });

            return await tagQuery.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<(int year, int month, int PostsCount)> CountTotalPostFromMonthsAsync(int month, CancellationToken cancellationToken = default) {
            var date = DateTime.Now.AddMonths(-month);
            var result = await _context.Set<Post>()
                .Where(p => p.PostedDate > date).CountAsync(cancellationToken);
            return (date.Year, date.Month, result);
        }

        public async Task<Post> GetPostByIdAsync(int id, CancellationToken cancellationToken) {
            return await _context.Set<Post>()
                .Include(c => c.Category)
                .Include(a => a.Author)
                .Include(t => t.Tags)
                .OrderBy(n => n.Title)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Post> AddOrUpdatePostAsync(Post post, CancellationToken cancellationToken) {

            if (_context.Set<Post>().Any(p => p.Id == post.Id)) {
                _context.Entry(post).State = EntityState.Modified;
            }
            else {
                _context.Posts.Add(post);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return post;

        }

        public async Task<IList<Category>> GetAllCategoriesAsync(CancellationToken cancellationToken = default) {
            return await _context.Set<Category>()
                .ToListAsync(cancellationToken);
        }

        public async Task TogglePublishedStatusAsync(int id, CancellationToken cancellationToken = default) {
            await _context.Set<Post>()
                .Where(x => x.Id == id)
                .ExecuteUpdateAsync(p => p.SetProperty(x => x.Published, x => !x.Published), cancellationToken);
        }

        public async Task<IList<Post>> GetRandomPostsAsync(int randomNumber, CancellationToken cancellationToken = default) {
            return await _context.Set<Post>()
                .Include(a => a.Author)
                .Include(c => c.Category)
                .OrderBy(c => Guid.NewGuid())
                .Take(randomNumber).ToListAsync(cancellationToken);
        }

        public async Task<IList<Post>> FindPostsFromPostQueryAsync(IPostQuery postQuery, CancellationToken cancellationToken = default) {
            return await _context.Set<Post>()
                .Include(a => a.Author)
                .Include(c => c.Category)
                .Where(s => s.Author.Id == postQuery.AuthorId ||
                    s.Category.Id == postQuery.CategoryId ||
                    s.Category.UrlSlug == postQuery.CategorySlug ||
                    s.PostedDate.Day == postQuery.CreatedDate.Day ||
                    s.PostedDate.Month == postQuery.CreatedDate.Month ||
                    s.Tags.Any(t => t.Name.Contains(postQuery.TagName)))
                .ToListAsync(cancellationToken);
        }

        public async Task<int> CountPostsQueryAsync(IPostQuery postQuery, CancellationToken cancellationToken = default) {
            return await _context.Set<Post>()
                .Include(a => a.Author)
                .Include(c => c.Category)
                .CountAsync(s => s.Author.Id == postQuery.AuthorId ||
                    s.Category.Id == postQuery.CategoryId ||
                    s.Category.UrlSlug == postQuery.CategorySlug ||
                    s.PostedDate.Day == postQuery.CreatedDate.Day ||
                    s.PostedDate.Month == postQuery.CreatedDate.Month ||
                    s.Tags.Any(t => t.Name.Contains(postQuery.TagName)), cancellationToken); 
        }

        public async Task<IPagedList<Post>> PagingPostQueryAsync(IPagingParams pagingParams, IPostQuery postQuery, CancellationToken cancellationToken = default) {
            var postsQuery = _context.Set<Post>()
                .Include(a => a.Author)
                .Include(c => c.Category)
                .Where(s => s.Author.Id == postQuery.AuthorId ||
                    s.Category.Id == postQuery.CategoryId ||
                    s.Category.UrlSlug == postQuery.CategorySlug ||
                    s.PostedDate.Day == postQuery.CreatedDate.Day ||
                    s.PostedDate.Month == postQuery.CreatedDate.Month ||
                    s.Tags.Any(t => t.Name.Contains(postQuery.TagName)));

            return await postsQuery.ToPagedListAsync(pagingParams, cancellationToken);
        }
    }
}
