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
      episodeLikes: {
        Row: {
          date: string
          episode_alias: string
          id: string
          user_id: string
        }
        Insert: {
          date?: string
          episode_alias: string
          id?: string
          user_id?: string
        }
        Update: {
          date?: string
          episode_alias?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "episodeLikes_episode_alias_fkey"
            columns: ["episode_alias"]
            referencedRelation: "episodes"
            referencedColumns: ["alias"]
          },
          {
            foreignKeyName: "episodeLikes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      episodes: {
        Row: {
          alias: string
          date: string
          img: string
          name: string
          show_alias: string
        }
        Insert: {
          alias: string
          date: string
          img: string
          name: string
          show_alias: string
        }
        Update: {
          alias?: string
          date?: string
          img?: string
          name?: string
          show_alias?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string
          user_id: string
        }
        Insert: {
          email: string
          user_id: string
        }
        Update: {
          email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      showLikes: {
        Row: {
          date: string
          id: string
          show_alias: string
          user_id: string
        }
        Insert: {
          date?: string
          id?: string
          show_alias: string
          user_id?: string
        }
        Update: {
          date?: string
          id?: string
          show_alias?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "showLikes_show_alias_fkey"
            columns: ["show_alias"]
            referencedRelation: "shows"
            referencedColumns: ["alias"]
          },
          {
            foreignKeyName: "showLikes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shows: {
        Row: {
          alias: string
          img: string
          name: string
        }
        Insert: {
          alias: string
          img: string
          name: string
        }
        Update: {
          alias?: string
          img?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
