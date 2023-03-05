using TatBlog.Core.Contracts;
using TatBlog.Core.DTO;
using TatBlog.Core.Entities;
using TatBlog.Data.Contexts;
using TatBlog.Data.Seeders;
using TatBlog.Services.Blogs;
using TatBlog.WinApp;

// Tạo đối tượng DbContext để qualr lý phiên làm việc với CSDL và trạng thái của các đối tượng
var context = new BlogDbContext();

#region sample data
//// Tạo đối tượng khởi tạo dữ liệu mẫu
//var seeder = new DataSeeder(context);

//// Nhập dữ liệu mẫu
//seeder.Initialize();

//// Đọc danh sách tác giả từ CSDL
//var authors = context.Authors.ToList();

//// Xuất danh sách tác giả ra màn hình
//Console.WriteLine("{0,-4}{1,-30}{2,-30}{3,12}", "ID", "Full Name", "Email", "Joined Date");

//foreach (var author in authors) {
//    Console.WriteLine("{0,-4}{1,-30}{2,-30}{3,12:MM/dd/yyyy}", author.Id, author.FullName, author.Email, author.JoinedDate);
//}


#endregion

#region print posts list
//var posts = context.Posts
//    .Where(p => p.Published)
//    .OrderBy(p => p.Title)
//    .Select(p => new {
//        Id = p.Id,
//        Title = p.Title,
//        ViewCount = p.ViewCount,
//        PostedDate = p.PostedDate,
//        Author = p.Author.FullName,
//        Category = p.Category.Name
//    })
//    .ToList();

//foreach (var post in posts) {
//    Console.WriteLine("ID      : {0}", post.Id);
//    Console.WriteLine("Title   : {0}", post.Title);
//    Console.WriteLine("View    : {0}", post.ViewCount);
//    Console.WriteLine("Date    : {0:MM/dd/yyyy}", post.PostedDate);
//    Console.WriteLine("Author  : {0}", post.Author);
//    Console.WriteLine("Category: {0}", post.Category);
//    Console.WriteLine("".PadRight(80, '-'));
//}
#endregion

// Tạo đối tượng BlogRepository
IBlogRepository blogRepo = new BlogRepository(context);

#region get 3 most popular posts


//var posts = await blogRepo.GetPopularAriticlesAsync(3);

//foreach (var post in posts) {
//    Console.WriteLine("ID      : {0}", post.Id);
//    Console.WriteLine("Title   : {0}", post.Title);
//    Console.WriteLine("View    : {0}", post.ViewCount);
//    Console.WriteLine("Date    : {0:MM/dd/yyyy}", post.PostedDate);
//    Console.WriteLine("Author  : {0}", post.Author);
//    Console.WriteLine("Category: {0}", post.Category);
//    Console.WriteLine("".PadRight(80, '-'));
//}

#endregion

# region get list categories and number of posts belong to its

// Lấy danh sách danh mục
//var categories = await blogRepo.GetCategoriesAsync();

//Console.WriteLine("{0,-5}{1,-50}{2,10}",
//    "ID", "Name", "Count");

//foreach (var item in categories) {
//    Console.WriteLine("{0,-5}{1,-50}{2,10}",
//    item.Id, item.Name, item.PostCount);
//}

#endregion

#region get list tags name

//var pagingParams = new PagingParams {
//    PageNumber = 1,
//    PageSize = 5,
//    SortColumn = "Name",
//    SortOrder = "DESC"
//};

//var tagsList = await blogRepo.GetPagedTagsAsync(pagingParams);

//Console.WriteLine("{0,-5}{1,-50}{2,10}",
//    "ID", "Name", "Count");

//foreach (var item in tagsList) {
//    Console.WriteLine("{0,-5}{1,-50}{2,10}",
//    item.Id, item.Name, item.PostCount);
//}
#endregion

#region Homework

// 1.a
//string tagSlug = "google";
//var tag = await blogRepo.GetTagFromSlug(tagSlug);
//Console.WriteLine(tag.Name);

// 1.c
//var tags = await blogRepo.GetTagsAsync();

//foreach (var tag in tags) {

//    Console.WriteLine("{0,-5}{1,-50}{2,10}", tag.Id, tag.Name, tag.PostCount);
//}

// 1.d
//var tagsList = await blogRepo.GetTagsAsync();

//foreach (var tag in tagsList) {
//    Console.WriteLine(tag.Name);
//}

//var tagId = 1;
//blogRepo.DeleteTagByIdAsync(tagId);

//foreach (var tag in tagsList) {
//    Console.WriteLine(tag.Name);
//}

// 1.e
//var categoriesList = await blogRepo.GetCategoriesAsync();

//foreach (var category in categoriesList) {
//    Console.WriteLine("{0,-50}{1,-20}", category.Name, category.UrlSlug);
//}

//var categorySlug = "oop";

//var result = await blogRepo.GetCategoryBySlugAsync(categorySlug);

//Console.WriteLine("\n" + result.Name);


// 1.f
//var categoriesList = await blogRepo.GetCategoriesAsync();

//foreach (var category in categoriesList) {
//    Console.WriteLine("{0,-5}{1,-50}", category.Id, category.Name);
//}

//var categoryId = 1;

//var result = await blogRepo.GetCategoryByIdAsync(categoryId);

//Console.WriteLine("\n" + result.Name);


// 1.g

//Category categoryitem = new Category() {
////    id = 14,
//    Name = "Unity",
//    UrlSlug = "unity"
//};

//await blogRepo.AddOrUpdateCategoryAsync(categoryitem);

//var categorieslist = await blogRepo.GetCategoriesAsync();

//foreach (var category in categorieslist) {
//    Console.WriteLine("{0,-5}{1,-50}", category.Id, category.Name);
//}

// 1.h

//var categoryId = 13;

//await blogRepo.DeleteCategoryByIdAsync(categoryId);

//var categoriesList = await blogRepo.GetCategoriesAsync();

//foreach (var category in categoriesList) {
//    Console.WriteLine("{0,-5}{1,-50}", category.Id, category.Name);
//}

// 1.i

//var categoryUrl = "oop";
//var categoryUrl = "unity";

//var check = await blogRepo.IsCategorySlugExistedAsync(categoryUrl) ? "Có mã url " + categoryUrl : "không tồn tại mã url " + categoryUrl;
//Console.WriteLine(check);

// 1.g

//var pagingParams = new PagingParams() {
//    PageNumber = 1,
//    PageSize = 5,
//    SortColumn = "PostCount",
//    SortOrder = "DESC"
//};

//var categories = await blogRepo.GetPagedCategoryAsync(pagingParams);

//Console.WriteLine("{0, -40}{1, -50}{2, 10}",
//    "ID", "Name", "Count");

//foreach (var category in categories) {
//    Console.WriteLine("{0, -40}{1, -50}{2, 10}",
//        category.Id, category.Name, category.PostCount);
//}

// 1.k
//var month = 12;
//var listCategory = blogRepo.CountTotalPostFromMonths(month);
//Console.WriteLine("So bai viet tu nam {0}, thang {1} co {2} bai viet ", listCategory.Result.day, listCategory.Result.month, listCategory.Result.PostsCount);


// 1.l
//var postId = 1;

//var postResult = await blogRepo.GetPostByIdAsync(postId);
//Console.WriteLine("{0, -5}{1, -60}{2, 20}",
//    postResult.Id, postResult.Title, postResult.Author.FullName);


// 1.m
//var authorsList = await blogRepo.GetAllAuthorsAsync();
//var categoriesList = await blogRepo.GetAllCategoriesAsync();

//foreach (var author in authorsList) {
//    Console.WriteLine(author.FullName);
//}

//foreach (var category in categoriesList) {
//    Console.WriteLine(category.Name);
//}

//Console.WriteLine(authorsList[0]);

//Post newPost = new Post() {
//    Title = "Unity 3D Core",
//    ShortDescription = "Learn the basic about Unity 3D",
//    Description = "Get to work and understand how to make a 3D game with Unity",
//    UrlSlug = "unity-3d",
//    Meta = "I don't know what is this field supposed to be",
//    ViewCount = 9,
//    Published = true,
//    PostedDate = new DateTime(2022, 12, 30, 10, 20, 0),
//    ModifiedDate = null,
//    Author = authorsList[0],
//    Category = categoriesList[0],

//};

//await blogRepo.AddOrUpdatePostAsync(newPost);

//var postList = await blogRepo.GetAllPostsAsync();

//foreach (var post in postList) {
//    Console.WriteLine("{0, -5}{1, -60}{2, 20}",
//        post.Id, post.Title, post.Author.FullName);
//}

// 1.n
//await blogRepo.TogglePublishedStatusAsync(1);

// 1.o
//var randomPostsList = await blogRepo.GetRandomPostsAsync(4);

//foreach (var post in randomPostsList) {
//    Console.WriteLine(post.Id);
//}

#endregion

Console.ReadLine();