import { type Member } from "@/types/types";
import { committeeMembers } from "@/utils/committemembers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MembersProps {
  value: "half" | "full";
}

const Members: React.FC<MembersProps> = ({ value }) => {
  const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
    <div className="w-full rounded-lg border border-blue-900 bg-white p-2 md:w-[320px]">
      <div className="flex items-center space-x-4">
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={60}
          height={60}
          className="rounded-full border-2 border-orange-500 object-cover"
          // style={{ width: "48px", height: "48px" }}
        />
        <div className="flex flex-col">
          <h3 className="text-base font-bold tracking-wide text-orange-500">
            {member.name}
          </h3>
          <p className="text-sm font-bold text-gray-400">{member.batch}</p>
          <p className="mt-0.5 text-sm font-semibold uppercase text-gray-300">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );

  if (value === "half") {
    const topRow: Member[] = committeeMembers.slice(0, 3);
    const bottomRow: Member[] = committeeMembers.slice(3, 7);

    return (
      <div className="flex flex-col items-center justify-center space-y-4 px-4 md:px-0">
        <div className="flex w-full flex-col space-y-4 md:hidden">
          {[...topRow, ...bottomRow].map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-col md:space-y-4">
          {/* Top Row */}
          <div className="flex justify-center gap-4">
            {topRow.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
          {/* Bottom Row */}
          <div className="flex justify-center gap-4">
            {bottomRow.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
        
        <Link
          href="/committemembers"
          className="mx-auto mb-8 flex h-12 w-4/5 items-center justify-center rounded-full bg-blue-600 px-5 font-bold text-white transition-shadow duration-300 hover:shadow-2xl sm:h-14 sm:w-3/5 md:h-16 md:w-1/4"
        >
          View More Members
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white px-4 py-8">
      <div className="mx-auto max-w-[2000px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="transform transition-transform duration-300 hover:-translate-y-1"
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
