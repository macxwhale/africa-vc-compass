
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      regions: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      industries: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      stages: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      vc_firms: {
        Row: {
          id: string
          name: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
        }
        Insert: {
          id?: string
          name: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
        }
        Update: {
          id?: string
          name?: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
        }
      }
      pending_vc_firms: {
        Row: {
          id: string
          name: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
          status: string
          submittedAt: string
          reviewedAt?: string
          reviewNotes?: string
        }
        Insert: {
          id?: string
          name: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
          status: string
          submittedAt: string
          reviewedAt?: string
          reviewNotes?: string
        }
        Update: {
          id?: string
          name?: string
          website?: string
          hqLocation?: string
          regionsOfInterest?: string[]
          industries?: string[]
          investmentStage?: string[]
          typicalTicketSize?: string
          contactPerson?: Json
          description?: string
          linkedinUrl?: string
          twitterUrl?: string
          status?: string
          submittedAt?: string
          reviewedAt?: string
          reviewNotes?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
      }
    }
  }
}
