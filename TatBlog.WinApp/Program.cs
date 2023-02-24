using TatBlog.Data.Contexts;
using TatBlog.Data.Seeders;

// Tạo đối tượng DbContext để qualr lý phiên làm việc với CSDL và trạng thái của các đối tượng
var context = new BlogDbContext();

// Tạo đối tượng khởi tạo dữ liệu mẫu
var seeder = new DataSeeder(context);

// Nhập dữ liệu mẫu
seeder.Initialize();

// Đọc danh sách tác giả từ CSDL
var authors = context.Authors.ToList();

// Xuất danh sách tác giả ra màn hình
Console.WriteLine("{0,-4}{1,-30}{2,-30}{3,12}", "ID", "Full Name", "Email", "Joined Date");

foreach (var author in authors) {
    Console.WriteLine("{0,-4}{1,-30}{2,-30}{3,12:MM/dd/yyyy}", author.Id, author.FullName, author.Email, author.JoinedDate);

}

Console.ReadLine();