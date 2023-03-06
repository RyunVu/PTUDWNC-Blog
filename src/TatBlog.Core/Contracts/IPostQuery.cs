namespace TatBlog.Core.Contracts {
    public interface IPostQuery {
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }

        public string CategorySlug { get; set; }

        public DateTime CreatedDate { get; set; }

        public String TagName { get; set; }
    }
}
