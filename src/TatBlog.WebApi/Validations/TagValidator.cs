using FluentValidation;
using TatBlog.WebApi.Models;

namespace TatBlog.WebApi.Validations
{
    public class TagValidator : AbstractValidator<TagEditModel>{

        public TagValidator()
        {
            RuleFor(s => s.Name)
                .NotEmpty().WithMessage("Tên chủ đề không được bỏ trống")
                .MaximumLength(100).WithMessage("Tên chủ đề không được nhiều hơn 100 ký tự");

            RuleFor(s => s.Description)
                .NotEmpty().WithMessage("Giới thiệu không được bỏ trống")
                .MaximumLength(1000).WithMessage("Mô tả không được nhiều hơn 1000 ký tự");

            RuleFor(s => s.UrlSlug)
                .NotEmpty()
                .WithMessage("Slug không được bỏ trống")
                .MaximumLength(500)
                .WithMessage("Slug không được nhiều hơn 500 ký tự");
        }
    }
}
