import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React, {useState} from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import  {ethers} from "ethers";
import fetch from 'node-fetch';


async function main() {


  const contractaddress = "0x0e4b2c277d559128310e77d688b6a790203c0e89";
  const abi=
    [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_content",
            "type": "string"
          }
        ],
        "name": "addComment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_id",
            "type": "string"
          }
        ],
        "name": "addLikes",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "content",
            "type": "string"
          }
        ],
        "name": "MessageSent",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint32",
            "name": "num",
            "type": "uint32"
          }
        ],
        "name": "like",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_id",
            "type": "string"
          }
        ],
        "name": "subLikes",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "comments",
        "outputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "content",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_id",
            "type": "string"
          }
        ],
        "name": "getComments",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "content",
                "type": "string"
              }
            ],
            "internalType": "struct Social.Comment[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "likes",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_id",
            "type": "string"
          }
        ],
        "name": "showLikes",
        "outputs": [
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
  if(typeof window.ethereum!=="undefined")
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("provider",provider);
    const contract=new ethers.Contract(
      contractaddress,
      abi,
      provider
    );
    console.log("contract",contract);

    try{
      const data=await contract.showLikes("12");
      console.log("data123",data);
    }catch(err){
      console.log("Error:",err);

    }
  }

  
}

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};
const [openComment, setOpenComment] = useState(false);
const [comment, setComment] = useState('');
main();

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  const handleComment = () => {
    setComment('');
    window.alert(comment);
  }

  const descriptionLines = publication.metadata.content.split('\n');

  return (
    <div className={`${styles.feedPostContainer}`}>
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
        <h2 className="text-start text-2xl font-semibold w-full">
          {publication.metadata.name}
        </h2>

        {/* Description of the post */}
        <div className="text-start max-h-[300px] overflow-auto w-full">
          {descriptionLines.map((line : string, index : number) => (
            <p key={index}>{line}<br></br></p>
          ))}
        </div>

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
        <button className="flex justify-center items-center gap-1" onClick={()=>{setOpenComment(!openComment)}}><p>{publication.stats.totalAmountOfComments}</p> <p className="text-sm">Comments </p> <p><BiCommentDetail /></p></button>
      </div>
      {openComment && (
        <>
          <div className="flex justify-end items-center w-full h-10 rounded-full overflow-hidden">
            <input className="w-[80%] h-full p-2 bg-white bg-opacity-[30%]" onChange={(e)=>{
              setComment(e.target.value)
            }}/>
            <button className="w-[20%] h-full bg-white bg-opacity-[30%] border-l-[2px] border-gray-600" onClick={handleComment}>Post</button>
          </div>
          <div>
            {/* Comments should be updated */}
          </div>
        </>
      )}
    </div>
  );
}
