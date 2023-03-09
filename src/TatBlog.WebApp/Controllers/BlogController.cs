using Microsoft.AspNetCore.Mvc;
using TatBlog.Core.Collections;
using TatBlog.Core.Contracts;
using TatBlog.Services.Blogs;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace TatBlog.WebApp.Controllers {
    public class BlogController : Controller{

        private readonly IBlogRepository _blogRepository;

        public BlogController(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        public async Task<IActionResult> Index(
            [FromQuery(Name = "k")] string keyword = null,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 10) {

            var postQuery = new PostQuery() {
                Published = true,
                Keyword = keyword
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Category(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                CategorySlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Author(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                AuthorSlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Tag(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                TagSlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Post(
            int year,
            int month,
            int day,
            string slug) {

            var post = await _blogRepository.GetPostAsync(year, month, day, slug);

            await _blogRepository.IncreaseViewCountAsync(post.Id);

            ViewBag.Post = post;

            return View(post);

        }

        public async Task<IActionResult> Archives(
            int year,
            int month,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postsQuery = new PostQuery() {
                Year = year,
                Month = month,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postsQuery, pageNumber, pageSize);
            ViewBag.Date = new DateTime(year, month, 1);
            ViewBag.Post = postsList;

            return View(postsList);

        }

        public IActionResult About()
            => View(); 

        public IActionResult Contact()
            => View();

        public IActionResult Rss() 
            => Content("Nội dung dẽ được cập nhật");
    }
}
