export class CreateBoardDto {
    name: string;
    description: string;
    image?: string; 
    period: "EVERYDAY" | "WEEKLY" | "MONTHLY";
    frequency?: number;
    userId: string;
  }