import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";
import { BiCommentDetail, BiLike } from "react-icons/bi";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div className={styles.feedPostContainer}>
      <div className="w-full flex justify-start items-center gap-2">
        {/* Author Profile picture */}
        <Link href={`/profile/${publication.profile.handle}`}>
          <MediaRenderer
            // @ts-ignore
            src={publication?.profile?.picture?.original?.url || ""}
            alt={publication.profile.name || publication.profile.handle}
            className={styles.feedPostProfilePicture}
          />
        </Link>

        <div className="flex flex-col justify-center items-start text-start">

          {/* Author profile Name */}
          <Link
            href={`/profile/${publication.profile.handle}`}
            className="border-b border-gray-600"
          >
            {publication.profile.name || publication.profile.handle}
          </Link>

          <div className="text-xs text-gray-300 flex justify-start items-center">{publication.profile?.bio}</div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        {/* Name of the post */}
        <h2 className="text-start text-2xl font-semibold">
          {publication.metadata.name}
        </h2>

        {/* Description of the post */}
        <p className="text-start">
          {publication.metadata.content}
        </p>

        {/* Image / media of the post if there is one */}
        { (publication.metadata.image || publication.metadata.media?.length > 0) && (
            publication.metadata.media.map((url, index) => (
              <MediaRenderer
                key={index} // Adding a unique key for each rendered component
                src={url.original.url}
                alt={publication.metadata.name || ""}
                className={styles.feedPostContentImage}
              />
            ))
          )
        }

      </div>

      <div className="w-full flex justify-center items-center gap-5 p-2 bg-white bg-opacity-[25%] rounded">
        <p className="flex justify-center items-center gap-1"><p>{publication.stats.totalAmountOfCollects}</p> <p className="text-sm">Collects</p> <p><BiLike/></p></p>
        <p className="flex justify-center items-center gap-1"><p>{publication.stats.totalAmountOfComments}</p> <p className="text-sm">Comments </p> <p><BiCommentDetail /></p></p>
      </div>
    </div>
  );
}
