using System.ComponentModel.DataAnnotations;

namespace TatBlog.WebApp.Models {
    public class EmailModel {
        [EmailAddress]
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
