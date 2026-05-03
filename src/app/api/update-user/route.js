import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ success: false });
  }

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("mangoDB");

  await db.collection("user").updateOne(
    { _id: new ObjectId(session.user.id) },
    {
      $set: {
        name: body.name,
        image: body.image,
      },
    }
  );

  return Response.json({ success: true });
}