
import { fixDatabaseSchema } from "@/services/supabaseService";

// Function to manually fix database schema
export const runSchemaFix = async (): Promise<void> => {
  console.log("Starting database schema fix...");
  
  try {
    const success = await fixDatabaseSchema();
    
    if (success) {
      console.log("Database schema fix completed successfully!");
    } else {
      console.error("Database schema fix failed.");
    }
  } catch (error) {
    console.error("Error fixing database schema:", error);
  }
};

// Function that can be called from browser console for debugging
export const fixSupabaseTables = async (): Promise<void> => {
  await runSchemaFix();
};

// Make the fix function available globally for easy access from browser console
if (typeof window !== 'undefined') {
  (window as any).fixSupabaseTables = fixSupabaseTables;
}

// Run the schema fix when this module is imported
runSchemaFix().catch(error => {
  console.error("Failed to run schema fix on import:", error);
});
