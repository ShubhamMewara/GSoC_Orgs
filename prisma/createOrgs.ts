import prisma from "./db";

export async function createOrgs(allorgs: any) {
    allorgs.map(async (orgsOnPage:any) => {
        orgsOnPage.map(async (org:any) => {
            let orgExists = await prisma.organizations.findFirst(
                {
                    where: {
                        name: org.name
                    },
                    select:{
                        name: true}
                }
            )
            if (!(orgExists?.name == null)) {
                let orgYear = await prisma.organizations.findFirst(
                    {
                        where: {
                            name: org.name
                        },
                        select:{
                            year: true
                        }
                    }
                )
                
                await prisma.organizations.updateMany({
                    where: {
                        name: org.name,
                    },
                    data: {
                        year: [org.year, ...orgYear?.year || []],
                        link: org.link
                    },
                });
            }
            else(
                await prisma.organizations.create({
                    data: {
                        name: org.name,
                        description: org.description,
                        img: org.img,
                        link: org.link,
                        year: [org.year]
                    }
                })
            )
        })
    })
}

export async function createProjects(allprojects: any) {
    allprojects.map(async (project:any) => {
        await prisma.projects.create({
            data: {
                contributor: project.contributor,
                mentor: project.mentor,
                organizationName: project.organization,
                title: project.title,
                description: project.description,
                projectDetails: project.projectDetails,
                codeLink: project.codeLink,
                year: project.year
            }
        })
    })
}