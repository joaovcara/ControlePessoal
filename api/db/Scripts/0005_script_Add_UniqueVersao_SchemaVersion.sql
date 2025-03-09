IF NOT EXISTS (SELECT * FROM sys.indexes 
               WHERE object_id = OBJECT_ID('SchemaVersion') 
               AND name = 'UQ_SchemaVersion_Version')
BEGIN
    ALTER TABLE SchemaVersion
    ADD CONSTRAINT UQ_SchemaVersion_Version UNIQUE (Version);
END;