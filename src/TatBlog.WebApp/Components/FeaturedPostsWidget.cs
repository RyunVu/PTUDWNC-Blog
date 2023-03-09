﻿using Microsoft.AspNetCore.Mvc;
using TatBlog.Services.Blogs;

namespace TatBlog.WebApp.Components {
    public class FeaturedPostsWidget : ViewComponent{
        private readonly IBlogRepository _blogRepository;

        public FeaturedPostsWidget(IBlogRepository blogRepository) {
            _blogRepository = blogRepository;
        }

        public async Task<IViewComponentResult> InvokeAsync() {

            int popularPostsNum = 3;

            // Lấy danh sách chủ đề
            var categories = await _blogRepository.GetPopularAriticlesAsync(popularPostsNum);

            return View(categories);
        }
    }
}
