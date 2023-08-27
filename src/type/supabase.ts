export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string;
          creator_mode: boolean;
          email: string | null;
          id: string;
          name: string | null;
          pfp: string | null;
          phone: string | null;
        };
        Insert: {
          created_at?: string;
          creator_mode?: boolean;
          email?: string | null;
          id: string;
          name?: string | null;
          pfp?: string | null;
          phone?: string | null;
        };
        Update: {
          created_at?: string;
          creator_mode?: boolean;
          email?: string | null;
          id?: string;
          name?: string | null;
          pfp?: string | null;
          phone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      videos: {
        Row: {
          birth_year: number | null;
          casts: Json | null;
          created_at: string;
          creator_id: string | null;
          description: string | null;
          id: string;
          running_time: number | null;
          staffs: Json | null;
          thumbnail_url: string | null;
          title: string | null;
        };
        Insert: {
          birth_year?: number | null;
          casts?: Json | null;
          created_at?: string;
          creator_id?: string | null;
          description?: string | null;
          id: string;
          running_time?: number | null;
          staffs?: Json | null;
          thumbnail_url?: string | null;
          title?: string | null;
        };
        Update: {
          birth_year?: number | null;
          casts?: Json | null;
          created_at?: string;
          creator_id?: string | null;
          description?: string | null;
          id?: string;
          running_time?: number | null;
          staffs?: Json | null;
          thumbnail_url?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
