-- CreateTable
CREATE TABLE "Organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "weblink" TEXT NOT NULL,
    "year" INTEGER[],
    "Technologies" TEXT[],
    "Topics" TEXT[],

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "contributor" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectDetails" TEXT NOT NULL,
    "codeLink" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "organizationName" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "textContent" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "organizationsName" TEXT,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_name_key" ON "Organizations"("name");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_organizationsName_fkey" FOREIGN KEY ("organizationsName") REFERENCES "Organizations"("name") ON DELETE SET NULL ON UPDATE CASCADE;
