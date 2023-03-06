using TatBlog.Core.Contracts;

namespace TatBlog.WinApp {
    public class PostQuery : IPostQuery{
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }
        public string CategorySlug { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string TagName { get; set; } = string.Empty;
    }
}
