using Microsoft.AspNetCore.Mvc;
using TatBlog.Services.Blogs;

namespace TatBlog.WebApp.Components {
    public class BestAuthorsWidget : ViewComponent {
        private readonly IBlogRepository _blogRepository;

        public BestAuthorsWidget(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync() {

            int authorsNum = 5;

            // Lấy danh sách chủ đề
            var authors = await _blogRepository.GetPopularAuthorsAsync(authorsNum);

            return View(authors);
        }
    }
}
