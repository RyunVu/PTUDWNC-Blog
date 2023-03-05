using TatBlog.Core.Contracts;
using TatBlog.Core.DTO;

namespace TatBlog.Core.Entities;
public class Category : IEntity {
    public int Id { get; set; }
    public string Name { get; set; }
        
    // Tên định danh dùng để tạo URL
    public string UrlSlug { get; set; }

    public string Description { get; set; }
    public bool ShowOnMenu { get; set; }
        
    // Danh sách các bài viết thuộc chuyên mục
    public IList<Post> Posts { get; set; }

}
