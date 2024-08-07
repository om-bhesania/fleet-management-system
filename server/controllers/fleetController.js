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
