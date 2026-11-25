#!/usr/bin/env bash
# ==============================================================================
# Ideal Express - Respaldo en Caliente de Base de Datos SQLite (Modo WAL)
# Frecuencia recomendada: Cada 6 horas
# Retención: 7 días
# ==============================================================================
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/home/ubuntu/backups/idealexpress}"
VOLUME_NAME="${VOLUME_NAME:-ideal_data}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/ideal_${TIMESTAMP}.db.gz"

mkdir -p "$BACKUP_DIR"

echo "[$(date -Iseconds)] Iniciando respaldo de base de datos SQLite (${VOLUME_NAME})..."

# Ejecución atómica en caliente con contenedor Alpine efímero
docker run --rm \
  -v "${VOLUME_NAME}:/data" \
  -v "${BACKUP_DIR}:/backup" \
  alpine:latest sh -c "
    apk add --no-cache sqlite gzip >/dev/null 2>&1 && \
    sqlite3 /data/ideal.db '.backup /backup/temp_${TIMESTAMP}.db' && \
    gzip -c /backup/temp_${TIMESTAMP}.db > /backup/ideal_${TIMESTAMP}.db.gz && \
    rm -f /backup/temp_${TIMESTAMP}.db
  "

if [ -f "$BACKUP_FILE" ]; then
  FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
  echo "[$(date -Iseconds)] Respaldo generado con éxito: ${BACKUP_FILE} (${FILE_SIZE})"
else
  echo "[$(date -Iseconds)] ERROR: No se pudo generar el archivo de respaldo" >&2
  exit 1
fi

# Rotación automática: Eliminar archivos de respaldo con más de 7 días
echo "[$(date -Iseconds)] Rotando respaldos antiguos (más de 7 días)..."
find "$BACKUP_DIR" -name "ideal_*.db.gz" -type f -mtime +7 -delete

echo "[$(date -Iseconds)] Proceso de respaldo completado satisfactoriamente."
