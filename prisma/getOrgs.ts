import prisma from "./db";

/**
 * Retrieves all organizations from the database.
 * @returns {Promise<Array<Organization>>} A promise that resolves to an array of organizations.
 */
export async function getAllOrgs() {
    const allOrgs = await prisma.organizations.findMany({
        orderBy:{
            name: 'asc'
        }
    });
    return allOrgs;
}

export async function getOrgsTechnologies() {
    const orgsTechnologies = await prisma.organizations.findMany(
        {
            select: {
                Technologies: true,
                name: true,
            }
        }
    );
    return orgsTechnologies;
}

export async function getOrgsByName(name: string) {
    const orgsTechnologies = await prisma.organizations.findUnique(
        {
            where:{
                name: name
            }
        }
    );
    return orgsTechnologies;
}

export async function getProjectsByName(name: string) {
    const orgsTechnologies = await prisma.projects.findMany(
        {
            where:{
                organizationName: name
            }
        }
    );
    return orgsTechnologies;
}