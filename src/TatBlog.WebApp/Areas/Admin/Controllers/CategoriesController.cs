using FluentValidation;
using FluentValidation.AspNetCore;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TatBlog.Core.Collections;
using TatBlog.Core.Contracts;
using TatBlog.Core.Entities;
using TatBlog.Services.Blogs;
using TatBlog.WebApp.Areas.Admin.Models;
using TatBlog.WebApp.Validations;

namespace TatBlog.WebApp.Areas.Admin.Controllers {
    public class CategoriesController : Controller{

        private readonly IBlogRepository _blogRepo;
        private readonly IMapper _mapper;
        private readonly IValidator<CategoryEditModel> _cateValidator;

        public CategoriesController(IBlogRepository blogRepo, IMapper mapper) {
            _blogRepo = blogRepo;
            _mapper = mapper;
            _cateValidator = new CategoryValidator(_blogRepo);
        }

        public async Task<IActionResult> Index(CategoryFilterModel model,
            PagingParams pageParam,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 5) {

            IPagingParams paging = new PagingParams() {
                PageNumber = pageNumber,
                PageSize = pageSize,
                SortOrder = "DESC",
                SortColumn = "PostCount"
            };

            if (pageParam.PageSize != 0 || pageParam.PageNumber != 0) {
                paging.PageNumber = pageParam.PageNumber;
                paging.PageSize = pageParam.PageSize;
            }

            var categoryQuery = _mapper.Map<CategoryQuery>(model);

            var categories = await _blogRepo.GetPagedCategoryAsync(categoryQuery, paging);

            ViewBag.CategoriesList = model;

            return View(categories);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id) {
            var category = id > 0
                ? await _blogRepo.GetCategoryByIdAsync(id)
                : null;

            var model = category == null
                ? new CategoryEditModel()
                : _mapper.Map<CategoryEditModel>(category);

            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> Edit(CategoryEditModel model) {
            var validationResult = await this._cateValidator.ValidateAsync(model);

            if (!validationResult.IsValid) {
                validationResult.AddToModelState(ModelState);
            }

            if (!ModelState.IsValid) {
                return View(model);
            }

            var category = model.Id > 0
                ? await _blogRepo.GetCategoryByIdAsync(model.Id)
                : null;

            if (category == null) {
                category = _mapper.Map<Category>(model);

                category.Id = 0;
            }
            else {
                _mapper.Map(model, category);
            }

            await _blogRepo.AddOrUpdateCategoryAsync(category);

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> DeleteCategory(int id) {
            await _blogRepo.DeleteCategoryByIdAsync(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
