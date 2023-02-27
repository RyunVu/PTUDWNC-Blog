namespace TatBlog.Core.Contracts {
    public interface IPagingParams {
        // Số mẫu tin trên một trang
        int PageSize { get; set; }

        // Số trang 
        int PageNumber { get; set; }

        // Tên cột muốn sắp xếp
        string SortColumn { get; set; }

        // Thứ tự sắp xếp
        string SortOrder { get; set; }
    }
}
