using Microsoft.AspNetCore.Mvc;
using TatBlog.Services.Blogs;

namespace TatBlog.WebApp.Components {
    public class BestAuthorsWidget : ViewComponent {
        private readonly IAuthorRepository _authorRepo;

        public BestAuthorsWidget(IAuthorRepository authorRepo) {
            _authorRepo = authorRepo;
        }

        public async Task<IViewComponentResult> InvokeAsync() {
            
            // Lấy danh sách chủ đề
            var authors = await _authorRepo.GetAuthorsAsync();

            return View(authors);
        }
    }
}
