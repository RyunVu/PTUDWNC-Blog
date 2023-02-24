using TatBlog.Core.Contracts;

namespace TatBlog.Core.Entities {
    public class Author : IEntity {

        public int Id { get; set; }
        public string FullName { get; set; }

        // Tên định danh dùng để tạo URL
        public string UrlSlug { get; set; }
        
        // Đường dẫn tới file hình ảnh
        public string ImageUrl{ get; set; }

        // Ngày bất đầu
        public DateTime JoinedDate { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }
        public IList<Post> Posts { get; set; }
    }
}
