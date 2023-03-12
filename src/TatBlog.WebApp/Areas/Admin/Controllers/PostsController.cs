using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TatBlog.Core.Collections;
using TatBlog.Services.Blogs;
using TatBlog.WebApp.Areas.Admin.Models;

namespace TatBlog.WebApp.Areas.Admin.Controllers {
    public class PostsController : Controller{

        private readonly IBlogRepository _blogRepo;

        public PostsController(IBlogRepository blogRepository) {
            _blogRepo = blogRepository;
        }

        private async Task PopulatePostFilterModelAsync(PostFilterModel model) {
            var authors = await _blogRepo.GetAllAuthorsAsync();
            var categories = await _blogRepo.GetCategoriesAsync();

            model.AuthorList = authors.Select(a => new SelectListItem() {
                Text = a.FullName,
                Value = a.Id.ToString()
            });

            model.CategoryList = categories.Select(c => new SelectListItem() {
                Text = c.Name,
                Value = c.Id.ToString()
            });
        }

        //public IActionResult Index() {
        //    return View();
        //}

        public async Task<IActionResult> Index(PostFilterModel model) {
            var postQuery = new PostQuery() {
                Keyword = model.keyword,
                CategoryId = model.CategoryId,
                AuthorId = model.AuthorId,
                Year = model.Year,
                Month = model.Month
            };

            ViewBag.PostsList = await _blogRepo.GetPagedPostsAsync(postQuery, 1, 10);

            await PopulatePostFilterModelAsync(model);

            return View(model);
            
        }

    }
}
