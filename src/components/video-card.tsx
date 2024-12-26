import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: number;
  uploadedAt: Date;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  channelName,
  views,
  uploadedAt,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`}>
      <Card className="group overflow-hidden rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-medium leading-tight">{title}</h3>
          <div className="mt-2 flex flex-col text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors">{channelName}</span>
            <div className="flex items-center gap-1">
              <span>{Intl.NumberFormat('ja-JP').format(views)} 回視聴</span>
              <span>•</span>
              <span>{formatDistanceToNow(uploadedAt, { addSuffix: true, locale: ja })}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 
