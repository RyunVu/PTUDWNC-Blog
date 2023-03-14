using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using TatBlog.Services.Blogs;
using TatBlog.WebApp.Areas.Admin.Models;

namespace TatBlog.WebApp.Validations {
    public class PostValidator : AbstractValidator<PostEditModel>{

        private readonly IBlogRepository _blogRepo;

        public PostValidator(IBlogRepository blogRepository) {
            _blogRepo = blogRepository;

            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(500)
                .WithMessage("Tiêu đề không được để trống");

            RuleFor(x => x.ShortDescription)
                .NotEmpty();

            RuleFor(x => x.Description)
                .NotEmpty();

            RuleFor(x => x.Meta)
                .NotEmpty()
                .MaximumLength(1000)
                .WithMessage("Meta không được để trống");


            RuleFor(x => x.UrlSlug)
                .NotEmpty()
                .MaximumLength(1000)
                .WithMessage("Slug không được để trống");

            RuleFor(x => x.UrlSlug)
                .MustAsync(async (postModel, slug, cancellationToken) =>
                    !await blogRepository.IsPostSlugExistedAsync(postModel.Id, slug, cancellationToken))
                .WithMessage("Slug '{PropertyValue}' đã được sử dụng");

            RuleFor(x => x.CategoryId)
                .NotEmpty()
                .WithMessage("Bạn phải chọn chủ đề cho bài viết");

            RuleFor(x => x.AuthorId)
                .NotEmpty()
                .WithMessage("Bạn phải chọn tác giả của bài viết");

            RuleFor(x => x.SelectedTags)
                .Must(HasAtLeastOneTag)
                .WithMessage("Bạn phải nhập ít nhất một thẻ");

            When(x => x.Id <= 0, () => {
                RuleFor(x => x.ImageFile)
                    .Must(x => x is { Length: > 0 })
                    .WithMessage("Bạn phải chọn hình ảnh cho bài viết");
            })
            .Otherwise(() => {
                RuleFor(x => x.ImageFile)
                    .MustAsync(SetImageIfNotExist)
                    .WithMessage("Bạn phải chọn hình ảnh cho bài viết");
            });
        }

        // Check if user enter at least on tag
        private bool HasAtLeastOneTag(PostEditModel postModel, string selectedTags) {
            return postModel.GetSelectedTags().Any();
        }

        // Check if post has image or not.
        // If not, user must select file.
        private async Task<bool> SetImageIfNotExist(PostEditModel postModel, IFormFile imageFile, CancellationToken cancellationToken) {

            // Get post data from DB
            var post = await _blogRepo.GetPostByIdAsync(postModel.Id, false, cancellationToken);

            // If post has image -> Don't need to choose file
            if (!string.IsNullOrWhiteSpace(post?.ImageUrl))
                return true;

            // Else, check if user choose file or not. If not rasie error.
            return imageFile is { Length: > 0 };
        }

    }
}
