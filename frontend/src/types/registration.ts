export interface HackathonRegistration {
    userId: string;
    hackathonId: string;
    registrationData: {
        name: string;
        email: string;
        phoneNo?: string;
        institutionName?: string;
        biography?: string;
        githubUrl?: string;
        linkedinUrl?: string;
        resumeUrl?: string;
    };
    teamId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TeamRegistration {
    name: string;
    description?: string;
    hackathonId: string;
    leaderId: string;
    members: string[];
    lookingForMembers: boolean;
    requiredSkills?: string[];
}