using OnlineBank.DbLayer;
using Microsoft.EntityFrameworkCore;

namespace OnlineBank.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserDb> Users { get; set; }
        public DbSet<AccountDb> Accounts { get; set; }
        public DbSet<CardDb> Cards { get; set; }
        public DbSet<TransactionDb> Transactions { get; set; }

        public AppDbContext(string connectionString) : base(GetOptions(connectionString))
        {

        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountDb>()
                .HasOne(s => s.User)
                .WithMany(g => g.Accounts)
                .HasForeignKey(s => s.UserId);
            modelBuilder.Entity<CardDb>()
                .HasOne(s => s.Account)
                .WithMany(g => g.Cards)
                .HasForeignKey(s => s.AccountId);
            modelBuilder.Entity<TransactionDb>()
                .HasOne(s => s.Card)
                .WithMany(g => g.Transactions)
                .HasForeignKey(s => s.CardId);
        }
    }
}
