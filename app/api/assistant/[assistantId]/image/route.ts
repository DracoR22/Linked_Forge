import getCurrentUserServer from '@/actions/get-current-user-server';
import db from '@/lib/db';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';
import getSession from '@/actions/get-session';

export async function POST (req: Request, { params }: { params: { assistantId: string }}) {
    try {
        const session = await getSession()

        if (!session || !session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { image } = await req.json()

        if (!image) {
            return new NextResponse('Please select an image to upload', { status: 400 })
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "Assistants",
          });

        const assistant = await db.assistant.findUnique({
            where: {
                id: params.assistantId,
                userId: session.user.id
            },
            select: {
                userId: true,
                image: true
            }
        })

        if (!assistant) {
            return new NextResponse('Assistant not found', { status: 400 })
        }

        if (assistant.userId !== session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

            const assistantImageCreate = await db.image.create({
                data: {
                    assistantId: params.assistantId,
                    url: myCloud.secure_url,
                    publicId: myCloud.public_id
                }
            })

            return NextResponse.json(assistantImageCreate)
        
    } catch (error: any) {
        console.error('ASSISTANT_UPDATE_IMAGE', error);
        return new NextResponse('File size is too large. Maximum is 10 MB.', { status: 500 })
    }
}

export async function DELETE (req: Request, { params }: { params: { assistantId: string }}) {
    try {
        const session = await getSession()

        if (!session || !session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const assistant = await db.assistant.findUnique({
            where: {
                id: params.assistantId,
                userId: session.user.id
            },
            select: {
                id: true,
                userId: true,
                image: true
            }
        })

        if (!assistant) {
            return new NextResponse('Assistant not found', { status: 400 })
        }

        if (assistant.userId !== session.user.id) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (assistant.image?.publicId) {
            await cloudinary.v2.uploader.destroy(assistant.image?.publicId)
        }

        if (assistant.image?.id) {
            const deleteImage = await db.image.delete({
                where: {
                    assistantId: assistant.id,
                    id: assistant.image.id
                }
            });

            return NextResponse.json(deleteImage);
        } else {
            return new NextResponse('Image not found for the assistant', { status: 404 });
        }
    } catch (error) {
        console.error('ASSISTANT_DELETE_IMAGE', error);
        return new NextResponse('Could not upload image, try with another file.', { status: 500 })
    }
}