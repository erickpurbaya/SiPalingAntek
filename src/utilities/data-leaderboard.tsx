// import { supabase } from "../supabaseClient";
  
type AddLeaderboardScoreParams = {
  name: string;
  score: number;
  setIndicator?: (loading: boolean) => void;
};

export const addLeaderboardScore = async ({
  // name,
  // score,
  setIndicator,
}: AddLeaderboardScoreParams) => {
  setIndicator?.(true);

  try {
    console.log('In')
    // const { data, error } = await supabase
    //   .from('leaderboard')
    //   .insert({ name, score })
    //   .select();

    // if (error) {
    //   console.error('Failed to add leaderboard score:', error);
    //   return null;
    // }

    // return data;
  } finally {
    // setIndicator?.(false);
    setTimeout(() => {
      setIndicator?.(false);
    }, 3000)

  }
};