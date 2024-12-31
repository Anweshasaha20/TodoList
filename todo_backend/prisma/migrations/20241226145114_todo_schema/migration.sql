-- CreateTable
CREATE TABLE "todo" (
    "todoid" SERIAL NOT NULL,
    "description" VARCHAR(200) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("todoid")
);
