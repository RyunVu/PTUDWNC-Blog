﻿using TatBlog.Core.Contracts;

namespace TatBlog.WinApp {
    public class PagingParams : IPagingParams{
        public int PageSize { get; set; }
        public int PageNumber { get; set; } = 1;
        public string SortColumn { get; set; } = "Id";
        public string SortOrder { get; set; } = "ASC";
    }
}
