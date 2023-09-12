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
          episode_alias: string | null
          id: string
          user_id: string
        }
        Insert: {
          episode_alias?: string | null
          id?: string
          user_id?: string
        }
        Update: {
          episode_alias?: string | null
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
          date: string | null
          img: string | null
          name: string | null
          show_alias: string | null
        }
        Insert: {
          alias: string
          date?: string | null
          img?: string | null
          name?: string | null
          show_alias?: string | null
        }
        Update: {
          alias?: string
          date?: string | null
          img?: string | null
          name?: string | null
          show_alias?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_show_alias_fkey"
            columns: ["show_alias"]
            referencedRelation: "shows"
            referencedColumns: ["alias"]
          }
        ]
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
          id: string
          show_alias: string | null
          user_id: string
        }
        Insert: {
          id?: string
          show_alias?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          show_alias?: string | null
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
          img: string | null
          name: string
        }
        Insert: {
          alias: string
          img?: string | null
          name: string
        }
        Update: {
          alias?: string
          img?: string | null
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
