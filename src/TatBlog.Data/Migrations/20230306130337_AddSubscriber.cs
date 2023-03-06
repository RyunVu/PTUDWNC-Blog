using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TatBlog.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSubscriber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Subscribers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateSubscribe = table.Column<DateTime>(type: "datetime", nullable: false),
                    DateUnsubscribe = table.Column<DateTime>(type: "datetime", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: true),
                    subscribeStatus = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscribers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Subscribers");
        }
    }
}
