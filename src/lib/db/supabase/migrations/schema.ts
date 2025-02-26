import {
  pgTable,
  uuid,
  text,
  foreignKey,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const company = pgTable("company", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text(),
});

export const companyUsers = pgTable(
  "company_users",
  {
    companyId: uuid("company_id").notNull(),
    userId: uuid("user_id").notNull(),
    isAdmin: boolean("is_admin").default(false),
    fullName: text("full_name"),
  },
  (table) => [
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [company.id],
      name: "company_users_company_id_fkey",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "company_users_user_id_fkey",
    }),
    primaryKey({
      columns: [table.companyId, table.userId],
      name: "company_users_pkey",
    }),
  ]
);
