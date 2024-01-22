using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeslaRentingApp.Migrations
{
    /// <inheritdoc />
    public partial class TeslaRentingDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Loc_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Loc_Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Loc_Id);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Mod_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mod_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mod_PricePerDay = table.Column<decimal>(type: "money", nullable: false),
                    Mod_Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mod_Seats = table.Column<int>(type: "int", nullable: false),
                    Mod_Capacity = table.Column<int>(type: "int", nullable: false),
                    Mod_Range = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Mod_Id);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Res_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Res_CarId = table.Column<int>(type: "int", nullable: false),
                    Res_UserId = table.Column<int>(type: "int", nullable: false),
                    Res_DateStart = table.Column<int>(type: "int", nullable: false),
                    Res_DateEnd = table.Column<int>(type: "int", nullable: false),
                    Res_LocIdStart = table.Column<int>(type: "int", nullable: false),
                    Res_LocIdEnd = table.Column<int>(type: "int", nullable: false),
                    Res_Cost = table.Column<decimal>(type: "money", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Res_Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Usr_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Usr_FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Usr_Salt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Usr_SessionToken = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Usr_Id);
                });

            migrationBuilder.InsertData(
                table: "Locations",
                columns: new[] { "Loc_Id", "Loc_Name" },
                values: new object[,]
                {
                    { 1, "Palma Airport" },
                    { 2, "Palma City Center" },
                    { 3, "Alcudia" },
                    { 4, "Manacor" },
                    { 5, "Colònia de Sant Jordi" }
                });

            migrationBuilder.InsertData(
                table: "Models",
                columns: new[] { "Mod_Id", "Mod_Capacity", "Mod_Image", "Mod_Name", "Mod_PricePerDay", "Mod_Range", "Mod_Seats" },
                values: new object[,]
                {
                    { 1, 28, "model-s-plaid.png", "Model S Plaid", 49.18m, 396, 5 },
                    { 2, 28, "model-s.png", "Model S", 42.18m, 405, 5 },
                    { 3, 23, "model-3-performance.png", "Model 3 Performance", 27.55m, 315, 5 },
                    { 4, 23, "model-3-long.png", "Model 3 Long Range", 24.32m, 333, 5 },
                    { 5, 23, "model-3-rear.png", "Model 3 Rear-Wheel Drive", 22.18m, 272, 5 },
                    { 6, 88, "model-x-plaid.png", "Model X Plaid", 42.31m, 333, 6 },
                    { 7, 88, "model-x.png", "Model X", 38.78m, 348, 7 },
                    { 8, 76, "model-y-performance.png", "Model Y Performance", 29.99m, 303, 5 },
                    { 9, 76, "model-y-long.png", "Model Y Long Range", 26.74m, 330, 7 },
                    { 10, 76, "model-y-rear.png", "Model Y Rear-Wheel Drive", 23.25m, 260, 5 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
