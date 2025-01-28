using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2.Migrations
{
    /// <inheritdoc />
    public partial class g9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        CREATE VIEW [dbo].[Order_Details_View]
AS
SELECT dbo.[Order].Order_Date, dbo.[Order].Order_Amount, dbo.Users.Name, dbo.Users.Address1, dbo.Users.Address2, dbo.Users.City, dbo.Users.Country, dbo.Users.Phone, dbo.Users.PostalCode, dbo.Users.State, dbo.Users.Email, 
                  dbo.Products.Name AS Product_Name, dbo.OrderDetails.Qty, dbo.Products.CreatedBy, dbo.Products.Id
FROM     dbo.Products INNER JOIN
                  dbo.OrderDetails ON dbo.Products.Id = dbo.OrderDetails.p_id INNER JOIN
                  dbo.[Order] ON dbo.OrderDetails.Ord_Id = dbo.[Order].Id INNER JOIN
                  dbo.Users ON dbo.[Order].u_id = dbo.Users.Email
GO

INSERT INTO [dbo].[Users]
           ([Name]
           ,[Email]
           ,[Password]
           ,[Address1]
           ,[Address2]
           ,[City]
           ,[Country]
           ,[IsAdmin]
           ,[Phone]
           ,[PostalCode]
           ,[State])
     VALUES
           ('Admin'
           ,'Admin@Test.com'
           ,'Test@123'
           ,'Admin Address1'
           ,'Admin Address2'
           ,'Howrah'
           ,'IN'
           ,1
           ,'8100470811'
           ,'711302'
           ,'WB')
GO



    ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
