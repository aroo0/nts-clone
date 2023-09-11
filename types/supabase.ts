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
          episode_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          episode_id?: string | null
          id?: string
          user_id?: string
        }
        Update: {
          episode_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "episodeLikes_episode_id_fkey"
            columns: ["episode_id"]
            referencedRelation: "episodes"
            referencedColumns: ["id"]
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
          date: string | null
          id: string
          img: string | null
          name: string | null
          show_id: string | null
        }
        Insert: {
          alias: string
          date?: string | null
          id?: string
          img?: string | null
          name?: string | null
          show_id?: string | null
        }
        Update: {
          alias?: string
          date?: string | null
          id?: string
          img?: string | null
          name?: string | null
          show_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_show_id_fkey"
            columns: ["show_id"]
            referencedRelation: "shows"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string
          id: string
        }
        Insert: {
          email: string
          id: string
        }
        Update: {
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      showLikes: {
        Row: {
          id: string
          show_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          show_id?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          show_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "showLikes_show_id_fkey"
            columns: ["show_id"]
            referencedRelation: "shows"
            referencedColumns: ["id"]
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
          id: string
          img: string | null
          name: string | null
        }
        Insert: {
          alias: string
          id?: string
          img?: string | null
          name?: string | null
        }
        Update: {
          alias?: string
          id?: string
          img?: string | null
          name?: string | null
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
