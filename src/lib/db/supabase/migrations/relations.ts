import { relations } from "drizzle-orm/relations";
import { company, companyUsers, usersInAuth } from "./schema";

export const companyUsersRelations = relations(companyUsers, ({one}) => ({
	company: one(company, {
		fields: [companyUsers.companyId],
		references: [company.id]
	}),
	usersInAuth: one(usersInAuth, {
		fields: [companyUsers.userId],
		references: [usersInAuth.id]
	}),
}));

export const companyRelations = relations(company, ({many}) => ({
	companyUsers: many(companyUsers),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	companyUsers: many(companyUsers),
}));