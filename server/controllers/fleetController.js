import client from "../config/database.js";

/**
 * @swagger
 * /api/v1/addfleet:
 *   post:
 *     summary: Add a new fleet vehicle
 *     description: Adds a new vehicle to the fleet with all required details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: 'New York'
 *               projectName:
 *                 type: string
 *                 example: 'Project X'
 *               vehicleType:
 *                 type: string
 *                 example: 'Truck'
 *               isCorporationVehicle:
 *                 type: boolean
 *                 example: true
 *               chassisNumber:
 *                 type: string
 *                 example: 'CH12345'
 *               engineNumber:
 *                 type: string
 *                 example: 'EN67890'
 *               rcBookNumber:
 *                 type: string
 *                 example: 'RC112233'
 *               rcFile:
 *                 type: string
 *                 example: 'path/to/rcfile.pdf'
 *               insurancePolicyNumber:
 *                 type: string
 *                 example: 'IP987654321'
 *               insuranceRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-01-01'
 *               insuranceExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-01-01'
 *               insuranceFile:
 *                 type: string
 *                 example: 'path/to/insurancefile.pdf'
 *               pucNumber:
 *                 type: string
 *                 example: 'PUC998877'
 *               pucRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-06-01'
 *               pucExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-06-01'
 *               pucFile:
 *                 type: string
 *                 example: 'path/to/pucfile.pdf'
 *               fitnessRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-12-01'
 *               fitnessExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-12-01'
 *               fitnessFile:
 *                 type: string
 *                 example: 'path/to/fitnessfile.pdf'
 *               areaName:
 *                 type: string
 *                 example: 'Brooklyn'
 *               driverName:
 *                 type: string
 *                 example: 'John Doe'
 *               driverLicenseNumber:
 *                 type: string
 *                 example: 'DL1234567890'
 *               driverLicenseFile:
 *                 type: string
 *                 example: 'path/to/driverlicensefile.pdf'
 *             required:
 *               - cityName
 *               - projectName
 *               - vehicleType
 *               - areaName
 *     responses:
 *       201:
 *         description: Fleet vehicle added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle added successfully'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Insertion of Fleet Vehicle Failed'
 *                 error:
 *                   type: string
 *                   example: 'Detailed error message'
 */

export const addFleet = async (req, res) => {
    try {
        const {
            cityName,
            projectName,
            vehicleType,
            isCorporationVehicle,
            chassisNumber,
            engineNumber,
            rcBookNumber,
            rcFile,
            insurancePolicyNumber,
            insuranceRenewalDate,
            insuranceExpiryDate,
            insuranceFile,
            pucNumber,
            pucRenewalDate,
            pucExpiryDate,
            pucFile,
            fitnessRenewalDate,
            fitnessExpiryDate,
            fitnessFile,
            areaName,
            driverName,
            driverLicenseNumber,
            driverLicenseFile,
        } = req.body;

        const query = `
            INSERT INTO Vehicles (
                cityName, 
                projectName, 
                vehicleType, 
                isCorporationVehicle, 
                chassisNumber, 
                engineNumber, 
                rcBookNumber, 
                rcFile, 
                insurancePolicyNumber, 
                insuranceRenewalDate, 
                insuranceExpiryDate, 
                insuranceFile, 
                pucNumber, 
                pucRenewalDate, 
                pucExpiryDate, 
                pucFile, 
                fitnessRenewalDate, 
                fitnessExpiryDate, 
                fitnessFile, 
                areaName, 
                driverName, 
                driverLicenseNumber, 
                driverLicenseFile
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
            )
        `;

        await client.query(query,[
            cityName, 
            projectName, 
            vehicleType, 
            isCorporationVehicle, 
            chassisNumber, 
            engineNumber, 
            rcBookNumber, 
            rcFile, 
            insurancePolicyNumber, 
            insuranceRenewalDate, 
            insuranceExpiryDate, 
            insuranceFile, 
            pucNumber, 
            pucRenewalDate, 
            pucExpiryDate, 
            pucFile, 
            fitnessRenewalDate, 
            fitnessExpiryDate, 
            fitnessFile, 
            areaName, 
            driverName, 
            driverLicenseNumber, 
            driverLicenseFile,
        ]);

        res.status(201).json({
            success: true,
            msg: "Fleet vehicle added successfully",
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            success: false,
            msg: "Insertion of Fleet Vehicle Failed",
            error: error.message,
        });
    }
}

/**
 * @swagger
 * /api/v1/fleet:
 *   get:
 *     summary: Get all fleet vehicles
 *     description: Retrieves a list of all fleet vehicles, excluding those marked as deleted.
 *     responses:
 *       200:
 *         description: List of all fleet vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       vehicleId:
 *                         type: integer
 *                         example: 1
 *                       cityName:
 *                         type: string
 *                         example: 'New York'
 *                       projectName:
 *                         type: string
 *                         example: 'Project X'
 *                       vehicleType:
 *                         type: string
 *                         example: 'Truck'
 *                       isCorporationVehicle:
 *                         type: boolean
 *                         example: true
 *                       chassisNumber:
 *                         type: string
 *                         example: 'CH12345'
 *                       engineNumber:
 *                         type: string
 *                         example: 'EN67890'
 *                       rcBookNumber:
 *                         type: string
 *                         example: 'RC112233'
 *                       rcFile:
 *                         type: string
 *                         example: 'path/to/rcfile.pdf'
 *                       insurancePolicyNumber:
 *                         type: string
 *                         example: 'IP987654321'
 *                       insuranceRenewalDate:
 *                         type: string
 *                         format: date
 *                         example: '2024-01-01'
 *                       insuranceExpiryDate:
 *                         type: string
 *                         format: date
 *                         example: '2025-01-01'
 *                       insuranceFile:
 *                         type: string
 *                         example: 'path/to/insurancefile.pdf'
 *                       pucNumber:
 *                         type: string
 *                         example: 'PUC998877'
 *                       pucRenewalDate:
 *                         type: string
 *                         format: date
 *                         example: '2024-06-01'
 *                       pucExpiryDate:
 *                         type: string
 *                         format: date
 *                         example: '2025-06-01'
 *                       pucFile:
 *                         type: string
 *                         example: 'path/to/pucfile.pdf'
 *                       fitnessRenewalDate:
 *                         type: string
 *                         format: date
 *                         example: '2024-12-01'
 *                       fitnessExpiryDate:
 *                         type: string
 *                         format: date
 *                         example: '2025-12-01'
 *                       fitnessFile:
 *                         type: string
 *                         example: 'path/to/fitnessfile.pdf'
 *                       areaName:
 *                         type: string
 *                         example: 'Brooklyn'
 *                       driverName:
 *                         type: string
 *                         example: 'John Doe'
 *                       driverLicenseNumber:
 *                         type: string
 *                         example: 'DL1234567890'
 *                       driverLicenseFile:
 *                         type: string
 *                         example: 'path/to/driverlicensefile.pdf'
 */
export const getAllFleet = async (req, res) => {
    try {
        const query = 'SELECT * FROM Vehicles WHERE isDeleted = false';
        const result = await client.query(query);

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error("Error retrieving fleet vehicles:", error);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
};


/**
 * @swagger
 * /api/v1/fleet/{id}:
 *   get:
 *     summary: Get a fleet vehicle by ID
 *     description: Retrieves a fleet vehicle's details based on the provided ID, excluding vehicles marked as deleted.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the fleet vehicle
 *     responses:
 *       200:
 *         description: Fleet vehicle details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicleId:
 *                       type: integer
 *                       example: 1
 *                     cityName:
 *                       type: string
 *                       example: 'New York'
 *                     projectName:
 *                       type: string
 *                       example: 'Project X'
 *                     vehicleType:
 *                       type: string
 *                       example: 'Truck'
 *                     isCorporationVehicle:
 *                       type: boolean
 *                       example: true
 *                     chassisNumber:
 *                       type: string
 *                       example: 'CH12345'
 *                     engineNumber:
 *                       type: string
 *                       example: 'EN67890'
 *                     rcBookNumber:
 *                       type: string
 *                       example: 'RC112233'
 *                     rcFile:
 *                       type: string
 *                       example: 'path/to/rcfile.pdf'
 *                     insurancePolicyNumber:
 *                       type: string
 *                       example: 'IP987654321'
 *                     insuranceRenewalDate:
 *                       type: string
 *                       format: date
 *                       example: '2024-01-01'
 *                     insuranceExpiryDate:
 *                       type: string
 *                       format: date
 *                       example: '2025-01-01'
 *                     insuranceFile:
 *                       type: string
 *                       example: 'path/to/insurancefile.pdf'
 *                     pucNumber:
 *                       type: string
 *                       example: 'PUC998877'
 *                     pucRenewalDate:
 *                       type: string
 *                       format: date
 *                       example: '2024-06-01'
 *                     pucExpiryDate:
 *                       type: string
 *                       format: date
 *                       example: '2025-06-01'
 *                     pucFile:
 *                       type: string
 *                       example: 'path/to/pucfile.pdf'
 *                     fitnessRenewalDate:
 *                       type: string
 *                       format: date
 *                       example: '2024-12-01'
 *                     fitnessExpiryDate:
 *                       type: string
 *                       format: date
 *                       example: '2025-12-01'
 *                     fitnessFile:
 *                       type: string
 *                       example: 'path/to/fitnessfile.pdf'
 *                     areaName:
 *                       type: string
 *                       example: 'Brooklyn'
 *                     driverName:
 *                       type: string
 *                       example: 'John Doe'
 *                     driverLicenseNumber:
 *                       type: string
 *                       example: 'DL1234567890'
 *                     driverLicenseFile:
 *                       type: string
 *                       example: 'path/to/driverlicensefile.pdf'
 *       404:
 *         description: Fleet vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle not found'
 */


export const getFleetById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM Vehicles WHERE vehicleId = $1 AND isDeleted = false';
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Fleet vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error retrieving fleet vehicle:", error);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
};


/**
 * @swagger
 * /api/v1/fleet/{id}:
 *   put:
 *     summary: Update a fleet vehicle by ID
 *     description: Updates the details of a fleet vehicle based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the fleet vehicle to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cityName:
 *                 type: string
 *                 example: 'New York'
 *               projectName:
 *                 type: string
 *                 example: 'Project X'
 *               vehicleType:
 *                 type: string
 *                 example: 'Truck'
 *               isCorporationVehicle:
 *                 type: boolean
 *                 example: true
 *               chassisNumber:
 *                 type: string
 *                 example: 'CH12345'
 *               engineNumber:
 *                 type: string
 *                 example: 'EN67890'
 *               rcBookNumber:
 *                 type: string
 *                 example: 'RC112233'
 *               rcFile:
 *                 type: string
 *                 example: 'path/to/rcfile.pdf'
 *               insurancePolicyNumber:
 *                 type: string
 *                 example: 'IP987654321'
 *               insuranceRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-01-01'
 *               insuranceExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-01-01'
 *               insuranceFile:
 *                 type: string
 *                 example: 'path/to/insurancefile.pdf'
 *               pucNumber:
 *                 type: string
 *                 example: 'PUC998877'
 *               pucRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-06-01'
 *               pucExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-06-01'
 *               pucFile:
 *                 type: string
 *                 example: 'path/to/pucfile.pdf'
 *               fitnessRenewalDate:
 *                 type: string
 *                 format: date
 *                 example: '2024-12-01'
 *               fitnessExpiryDate:
 *                 type: string
 *                 format: date
 *                 example: '2025-12-01'
 *               fitnessFile:
 *                 type: string
 *                 example: 'path/to/fitnessfile.pdf'
 *               areaName:
 *                 type: string
 *                 example: 'Brooklyn'
 *               driverName:
 *                 type: string
 *                 example: 'John Doe'
 *               driverLicenseNumber:
 *                 type: string
 *                 example: 'DL1234567890'
 *               driverLicenseFile:
 *                 type: string
 *                 example: 'path/to/driverlicensefile.pdf'
 *     responses:
 *       200:
 *         description: Fleet vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle updated successfully'
 *       404:
 *         description: Fleet vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Update failed'
 *                 error:
 *                   type: string
 *                   example: 'Detailed error message'
 */

export const updateFleetById = async (req, res) => {
    const { id } = req.params;
    const {
        cityName,
        projectName,
        vehicleType,
        isCorporationVehicle,
        chassisNumber,
        engineNumber,
        rcBookNumber,
        rcFile,
        insurancePolicyNumber,
        insuranceRenewalDate,
        insuranceExpiryDate,
        insuranceFile,
        pucNumber,
        pucRenewalDate,
        pucExpiryDate,
        pucFile,
        fitnessRenewalDate,
        fitnessExpiryDate,
        fitnessFile,
        areaName,
        driverName,
        driverLicenseNumber,
        driverLicenseFile,
    } = req.body;

    try {
        const query = `
            UPDATE Vehicles SET
                cityName = $1,
                projectName = $2,
                vehicleType = $3,
                isCorporationVehicle = $4,
                chassisNumber = $5,
                engineNumber = $6,
                rcBookNumber = $7,
                rcFile = $8,
                insurancePolicyNumber = $9,
                insuranceRenewalDate = $10,
                insuranceExpiryDate = $11,
                insuranceFile = $12,
                pucNumber = $13,
                pucRenewalDate = $14,
                pucExpiryDate = $15,
                pucFile = $16,
                fitnessRenewalDate = $17,
                fitnessExpiryDate = $18,
                fitnessFile = $19,
                areaName = $20,
                driverName = $21,
                driverLicenseNumber = $22,
                driverLicenseFile = $23
            WHERE vehicleId = $24
        `;

        const result = await client.query(query, [
            cityName,
            projectName,
            vehicleType,
            isCorporationVehicle,
            chassisNumber,
            engineNumber,
            rcBookNumber,
            rcFile,
            insurancePolicyNumber,
            insuranceRenewalDate,
            insuranceExpiryDate,
            insuranceFile,
            pucNumber,
            pucRenewalDate,
            pucExpiryDate,
            pucFile,
            fitnessRenewalDate,
            fitnessExpiryDate,
            fitnessFile,
            areaName,
            driverName,
            driverLicenseNumber,
            driverLicenseFile,
            id
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Fleet vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: "Fleet vehicle updated successfully",
        });

    } catch (error) {
        console.error("Error updating fleet vehicle:", error);
        res.status(500).json({
            success: false,
            msg: "Update failed",
            error: error.message,
        });
    }
};


/**
 * @swagger
 * /api/v1/fleet/{id}:
 *   delete:
 *     summary: Post Request Soft delete a fleet vehicle by ID
 *     description: Sets the `isDeleted` flag to `true` for a fleet vehicle based on the provided ID, rather than permanently deleting it.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the fleet vehicle to soft delete
 *     responses:
 *       200:
 *         description: Fleet vehicle soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle soft deleted successfully'
 *       404:
 *         description: Fleet vehicle not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Fleet vehicle not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: 'Soft deletion failed'
 *                 error:
 *                   type: string
 *                   example: 'Detailed error message'
 */


export const deleteFleetById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE Vehicles SET isDeleted = true WHERE vehicleId = $1';
        const result = await client.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                msg: 'Fleet vehicle not found'
            });
        }

        res.status(200).json({
            success: true,
            msg: "Fleet vehicle soft deleted successfully",
        });

    } catch (error) {
        console.error("Error soft deleting fleet vehicle:", error);
        res.status(500).json({
            success: false,
            msg: "Soft deletion failed",
            error: error.message,
        });
    }
};
