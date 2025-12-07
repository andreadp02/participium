export type commentAuthorType = "MUNICIPALITY" | "EXTERNAL_MAINTAINER";

export interface createCommentDto {
  reportId: number;
  authorId: number;
  authorType: commentAuthorType;
  content: string;
}

export interface CommentDto {
  id: number;
  reportId: number;
  municipalityUserId: number | null;
  externalMaintainerId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}