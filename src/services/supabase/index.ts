
// Export the Supabase client
export { supabase, isSupabaseConfigured } from './supabaseClient';

// Export SQL utilities
export { executeSQL } from './sqlUtils';

// Export database setup functions
export { 
  checkIfTablesExist,
  createAllTables,
  ensureVCFirmsTableExists,
  testDatabaseConnection
} from './dbSetup';

// Export service modules
export { vcFirmService } from './vcFirmService';
export { regionService } from './regionService';
export { industryService } from './industryService';
export { stageService } from './stageService';
