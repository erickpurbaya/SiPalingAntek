import { supabase } from "../supabaseClient";
  
  export const addLeaderboardScore = async ({
    name,
    score
  } : {
    name: string;
    score: number;
  }) => {
    const { data, error } = await supabase
      .from('leaderboard')
      .insert({
        name,
        score,
      })
      .select();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };