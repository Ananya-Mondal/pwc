namespace project2.Data
{
    public class OrderView
    {
        public int Id { get; set; }
        public DateTime Order_Date { get; set; }
        public decimal Order_Amount { get; set; }
        public string Product_Name { get; set; }
        public int Qty { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string PostalCode { get; set; }
        public string State { get; set; }
        public string Email { get; set; }
        public string CreatedBy { get; set; }

    }
}
