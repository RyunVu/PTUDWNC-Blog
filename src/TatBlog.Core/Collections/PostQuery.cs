using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TatBlog.Core.Contracts;

namespace TatBlog.Core.Collections {
    public class PostQuery : IPostQuery {
        public int AuthorId { get ; set ; }
        public int CategoryId { get; set; }
        public string CategorySlug { get; set; }
        public string AuthorSlug { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Published { get; set; }
        public string TagSlug { get; set; }
        public string TagName { get; set; }
        public string Keyword { get; set; }
    }
}
