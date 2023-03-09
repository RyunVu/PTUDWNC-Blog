using Microsoft.AspNetCore.Mvc;
using TatBlog.Services.Blogs;

namespace TatBlog.WebApp.Components {
    public class ArchivesWidget : ViewComponent{

        private readonly IBlogRepository _blogRepository;

        public ArchivesWidget(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync() {

            int nearestMonth = 12;
            // Lấy danh sách chủ đề
            var posts = await _blogRepository.CountTotalPostFromMonthsAsync(nearestMonth);

            return View(posts);
        }
    }
}
